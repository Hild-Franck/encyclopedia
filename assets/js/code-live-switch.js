const liveCodeSVGs = document.querySelectorAll("img.live-code")

if (liveCodeSVGs) {
	liveCodeSVGs.forEach(svg => {
		const sibling = svg.nextElementSibling
		svg.addEventListener("click", () => {
			svg.style.display = "none"
			sibling.style.display = "initial"
		})
		sibling.addEventListener("click", () => {
			sibling.style.display = "none"
			svg.style.display = "initial"
		})
	})
}