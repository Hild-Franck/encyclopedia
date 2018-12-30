const liveCodeSVGs = document.querySelectorAll(".live-code")

if (liveCodeSVGs) {
	liveCodeSVGs.forEach(svg => {
		const sibling = svg.nextElementSibling
		svg.addEventListener("click", () => {
			svg.style.display = "none"
			sibling.style.display = "block"
		})
		sibling.addEventListener("click", () => {
			sibling.style.display = "none"
			svg.style.display = "block"
		})
	})
}