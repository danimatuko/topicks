import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button } from "react-bootstrap";

const ImageCropper = () => {
	const cropperRef = useRef(null);
	const onCrop = () => {
		const imageElement = cropperRef?.current;
		const cropper = imageElement?.cropper;
		console.log(cropper.getCroppedCanvas().toDataURL());
	};

	return (
		<>
			<div className="d-flex justify-content-between">
				<Cropper
					src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
					style={{ height: 150, width: 150 }}
					// Cropper.js options
					initialAspectRatio={1}
					guides={false}
					crop={onCrop}
					ref={cropperRef}
					preview=".img-preview"
					cropBoxResizable={false}
				/>
				<div
					className="img-preview "
					style={{
						width: "150px ",
						height: "150px ",
						border: "1px dotted black",
						overflow: "hidden",
						borderRadius: "150px"
					}}
				></div>
			</div>
			<Button variant="dark">Save</Button>
		</>
	);
};
export default ImageCropper;
