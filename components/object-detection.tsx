"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as ort from "onnxruntime-web";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Setup ONNX Runtime Web
ort.env.wasm.wasmPaths = "/";
ort.env.wasm.numThreads = 1;

const labels = [
  "person", "bicycle", "car", "motorcycle", "airplane", "bus", "train", "truck", "boat",
  "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
  "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack",
  "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball",
  "kite", "baseball bat", "baseball glove", "skateboard", "surfboard", "tennis racket",
  "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple",
  "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake",
  "chair", "couch", "potted plant", "bed", "dining table", "toilet", "tv", "laptop",
  "mouse", "remote", "keyboard", "cell phone", "microwave", "oven", "toaster", "sink",
  "refrigerator", "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"
];

interface ObjectDetectionProps {
  onClose: () => void;
}

export function ObjectDetection({ onClose }: ObjectDetectionProps) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<ort.InferenceSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load the model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true);
        // Check if WebGPU is available
        const modelPath = `${window.location.origin}/models/yolo.onnx`;
        console.log("Attempting to load model from:", modelPath);
        
        const session = await ort.InferenceSession.create(
          "/models/yolo.onnx",
          {
            executionProviders: ["webgpu"],
          }
        );
        setModel(session);
        setLoading(false);
      } catch (e: any) {
        console.error("Failed to load model:", e);
        // Fallback to WASM if WebGPU fails (optional, but user insisted on WebGPU)
        try {
            console.log("Falling back to wasm");
             const session = await ort.InferenceSession.create(
                "/models/yolo.onnx",
                {
                  executionProviders: ["wasm"],
                }
              );
              setModel(session);
              setLoading(false);
        } catch (e2: any) {
             setError("Failed to load model. Please ensure 'public/models/yolo.onnx' exists and WebGPU is enabled.");
             setLoading(false);
        }
       
      }
    };

    loadModel();
  }, []);

  // Inference loop
  useEffect(() => {
    if (!model || !webcamRef.current?.video) return;

    let animationId: number;

    const runInference = async () => {
      if (!webcamRef.current?.video || !model || !canvasRef.current) return;

      const video = webcamRef.current.video;
      if (video.readyState !== 4) {
        animationId = requestAnimationFrame(runInference);
        return;
      }

      const { videoWidth, videoHeight } = video;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Preprocess
      const input = preprocess(video, 640, 640);

      try {
        const feeds: Record<string, ort.Tensor> = {};
        feeds[model.inputNames[0]] = input;
        
        const outputMap = await model.run(feeds);
        const output = outputMap[model.outputNames[0]];
        
        // Postprocess and draw
        drawBoxes(output, canvasRef.current, videoWidth, videoHeight);
      } catch (e) {
        console.error("Inference error:", e);
      }

      animationId = requestAnimationFrame(runInference);
    };

    runInference();

    return () => cancelAnimationFrame(animationId);
  }, [model]);

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      <Button 
        className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 text-white"
        onClick={onClose}
      >
        <X className="mr-2 h-4 w-4" /> Close Camera
      </Button>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/80 text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading YOLO Model (WebGPU)...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/90 text-red-500 p-4 text-center">
          <div>
            <p className="text-xl font-bold mb-2">Error</p>
            <p>{error}</p>
            <Button className="mt-4" onClick={onClose}>Go Back</Button>
          </div>
        </div>
      )}

      <Webcam
        ref={webcamRef}
        className="absolute inset-0 w-full h-full object-contain"
        muted={true}
        screenshotFormat="image/jpeg"
        videoConstraints={{
            facingMode: "environment"
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />
    </div>
  );
}

// Helper functions

function preprocess(image: HTMLVideoElement, modelWidth: number, modelHeight: number): ort.Tensor {
  const canvas = document.createElement("canvas");
  canvas.width = modelWidth;
  canvas.height = modelHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get context");

  ctx.drawImage(image, 0, 0, modelWidth, modelHeight);
  const imageData = ctx.getImageData(0, 0, modelWidth, modelHeight);
  const { data } = imageData;

  const red = new Float32Array(modelWidth * modelHeight);
  const green = new Float32Array(modelWidth * modelHeight);
  const blue = new Float32Array(modelWidth * modelHeight);

  for (let i = 0; i < data.length; i += 4) {
    red[i / 4] = data[i] / 255.0;
    green[i / 4] = data[i + 1] / 255.0;
    blue[i / 4] = data[i + 2] / 255.0;
  }

  const input = new Float32Array(modelWidth * modelHeight * 3);
  input.set(red, 0);
  input.set(green, modelWidth * modelHeight);
  input.set(blue, modelWidth * modelHeight * 2);

  return new ort.Tensor("float32", input, [1, 3, modelHeight, modelWidth]);
}

function drawBoxes(output: ort.Tensor, canvas: HTMLCanvasElement, imgWidth: number, imgHeight: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // YOLOv8 output shape: [1, 84, 8400] (cx, cy, w, h, 80 classes)
  // We need to transpose it to [8400, 84] for easier processing
  const numAnchors = output.dims[2]; // 8400
  const numClass = output.dims[1] - 4; // 80
  const data = output.data as Float32Array;

  const boxes = [];
  
  // Loop through anchors
  for (let i = 0; i < numAnchors; i++) {
    // Find max class score
    let maxScore = 0;
    let maxClass = -1;
    
    // The data is flattened. 
    // Stride is numAnchors.
    // [0][0] is cx of anchor 0
    // [0][1] is cx of anchor 1
    // ...
    // [1][0] is cy of anchor 0
    
    // So for anchor i:
    // cx = data[0 * numAnchors + i]
    // cy = data[1 * numAnchors + i]
    // w  = data[2 * numAnchors + i]
    // h  = data[3 * numAnchors + i]
    // class 0 = data[4 * numAnchors + i]
    
    for (let c = 0; c < numClass; c++) {
        const score = data[(4 + c) * numAnchors + i];
        if (score > maxScore) {
            maxScore = score;
            maxClass = c;
        }
    }

    if (maxScore > 0.45) { // Threshold
        const cx = data[0 * numAnchors + i];
        const cy = data[1 * numAnchors + i];
        const w = data[2 * numAnchors + i];
        const h = data[3 * numAnchors + i];

        const x = (cx - w / 2) / 640 * imgWidth;
        const y = (cy - h / 2) / 640 * imgHeight;
        const width = (w / 640) * imgWidth;
        const height = (h / 640) * imgHeight;

        boxes.push({
            x, y, width, height, score: maxScore, class: maxClass, label: labels[maxClass]
        });
    }
  }

  // NMS (Simple version)
  const sortedBoxes = boxes.sort((a, b) => b.score - a.score);
  const resultBoxes = [];
  
  while (sortedBoxes.length > 0) {
      const current = sortedBoxes.shift();
      if (!current) break;
      resultBoxes.push(current);

      for (let i = sortedBoxes.length - 1; i >= 0; i--) {
          if (iou(current, sortedBoxes[i]) > 0.5) {
              sortedBoxes.splice(i, 1);
          }
      }
  }

  // Draw
  resultBoxes.forEach(box => {
      ctx.strokeStyle = "#00FF00";
      ctx.lineWidth = 4;
      ctx.strokeRect(box.x, box.y, box.width, box.height);
      
      ctx.fillStyle = "#00FF00";
      ctx.font = "18px Arial";
      ctx.fillText(`${box.label} ${(box.score * 100).toFixed(1)}%`, box.x, box.y > 20 ? box.y - 5 : box.y + 20);
  });
}

function iou(box1: any, box2: any) {
    const x1 = Math.max(box1.x, box2.x);
    const y1 = Math.max(box1.y, box2.y);
    const x2 = Math.min(box1.x + box1.width, box2.x + box2.width);
    const y2 = Math.min(box1.y + box1.height, box2.y + box2.height);

    const intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
    const area1 = box1.width * box1.height;
    const area2 = box2.width * box2.height;

    return intersection / (area1 + area2 - intersection);
}
