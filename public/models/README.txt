IMPORTANT:
You must place your YOLOv8 ONNX model file here and name it "yolo.onnx".

To export a YOLOv8 model to ONNX:
yolo export model=yolov8n.pt format=onnx opset=12

Then copy the 'yolov8n.onnx' to this folder and rename it to 'yolo.onnx'.

Without this file, the object detection feature will not work.