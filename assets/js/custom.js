let listElements = document.querySelectorAll('li');
listElements.forEach(element => {
  element.addEventListener('mousedown', function(){
    let clr = this.getAttribute('data-color');
    document.documentElement.style.setProperty('--color', clr);
    listElements.forEach(element=>{
      element.style.border="none";
    })
    this.style.border="3px solid black";
  })
});

let customInput = document.getElementById('custom-color-picker');
customInput.addEventListener('input', function(){
  let customClr = customInput.value;
  document.documentElement.style.setProperty('--color', customClr);
});


function previewDesign(event) {
	const file = event.target.files[0];
	const main = document.querySelector(".image_container");
  
	if (file) {
	  const reader = new FileReader();
  
	  reader.onload = function() {
		const tshirtImage = document.getElementById("tshirt-image");
		const designPreview = document.createElement("img");
  
		designPreview.classList.add("design-preview");
		designPreview.src = reader.result;
  
		tshirtImage.parentElement.appendChild(designPreview);
  
		interact(designPreview)
		  .draggable({
			 // keep the element within the area of it's parent
			 modifiers: [
				interact.modifiers.restrictRect({
				  restriction: 'parent',
				})
			  ],
			onmove: function (event) {
			  const target = event.target;
			  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
			  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
			  target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
			  target.setAttribute('data-x', x);
			  target.setAttribute('data-y', y);
			},
		  })
		  .resizable({
			edges: { left: true, right: true, bottom: true, top: true }
		  })
		  .on('resizemove', function (event) {
			const target = event.target;
			const x = (parseFloat(target.getAttribute('data-x')) || 0);
			const y = (parseFloat(target.getAttribute('data-y')) || 0);
  
			target.style.width = event.rect.width + 'px';
			target.style.height = event.rect.height + 'px';
  
			target.style.webkitTransform = target.style.transform = 'translate(' + (x + event.deltaRect.left) + 'px, ' + (y + event.deltaRect.top) + 'px)';
		  });
  
		// const sendButton = document.createElement("button");
		// sendButton.innerText = "Save Image";
		// main.parentElement.appendChild(sendButton);
  
		// sendButton.addEventListener("click", function() {
		// 	const canvas = document.createElement("canvas");
		// 	const context = canvas.getContext("2d");
		  
		// 	canvas.width = tshirtImage.width;
		// 	canvas.height = tshirtImage.height;
		  
		// 	context.drawImage(tshirtImage, 0, 0);
		// 	context.drawImage(designPreview, parseFloat(designPreview.getAttribute("data-x")) || 0, parseFloat(designPreview.getAttribute("data-y")) || 0, designPreview.width, designPreview.height);
		  
		// 	canvas.toBlob(function(blob) {
		// 	  const link = document.createElement("a");
		// 	  link.download = "custom-tshirt.png";
		// 	  link.href = URL.createObjectURL(blob);
		// 	  link.click();
		// 	});
		//   });
		  
	  };
  
	  reader.readAsDataURL(file);
	}
  }  