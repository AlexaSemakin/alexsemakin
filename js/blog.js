document.addEventListener("DOMContentLoaded", function () {
	// Category filtering
	const categoryLinks = document.querySelectorAll(".categories a");
	const blogPosts = document.querySelectorAll(".blog-post");

	categoryLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const category = e.target.getAttribute("href").replace("#", "");

			blogPosts.forEach((post) => {
				if (category === "all" || post.dataset.category === category) {
					post.style.display = "block";
				} else {
					post.style.display = "none";
				}
			});
		});
	});

	// Article viewing
	const postTitles = document.querySelectorAll(".post-title");

	postTitles.forEach((title) => {
		title.addEventListener("click", (e) => {
			e.preventDefault();
			const postId = e.target.dataset.postId;
			const article = e.target.closest(".blog-post");
			const preview = article.querySelector(".preview");
			const full = article.querySelector(".full");

			if (preview.style.display !== "none") {
				preview.style.display = "none";
				full.style.display = "block";
				// Update URL without page reload
				history.pushState({}, "", `?post=${postId}`);
			} else {
				preview.style.display = "block";
				full.style.display = "none";
				history.pushState({}, "", window.location.pathname);
			}
		});
	});

	// Handle browser back/forward
	window.addEventListener("popstate", () => {
		const params = new URLSearchParams(window.location.search);
		const postId = params.get("post");

		if (!postId) {
			// Show all previews
			document
				.querySelectorAll(".preview")
				.forEach((p) => (p.style.display = "block"));
			document
				.querySelectorAll(".full")
				.forEach((f) => (f.style.display = "none"));
		}
	});

	// Check URL on load
	const params = new URLSearchParams(window.location.search);
	const postId = params.get("post");
	if (postId) {
		const article = document
			.querySelector(`[data-post-id="${postId}"]`)
			.closest(".blog-post");
		article.querySelector(".preview").style.display = "none";
		article.querySelector(".full").style.display = "block";
	}
});
