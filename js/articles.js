document.addEventListener("DOMContentLoaded", function () {
	const articleContainer = document.getElementById("articleContainer");
	const categoryLinks = document.querySelectorAll(".categories a");

	// Function to load article content
	async function loadArticle(path) {
		const response = await fetch(path);
		const html = await response.text();
		return html;
	}

	// Function to load articles by category
	async function loadArticlesByCategory(category) {
		articleContainer.innerHTML = "";

		const articlePaths = {
			movies: ["articles/movies/0002.html", "articles/movies/0003.html"],
			games: ["articles/games/0001.html"],
			all: [
				"articles/movies/0002.html",
				"articles/movies/0003.html",
				"articles/games/0001.html",
			],
		};

		const paths = articlePaths[category] || [];
		const articles = [];

		// Load all articles for the category
		for (const path of paths) {
			const content = await loadArticle(path);
			const tempDiv = document.createElement("div");
			tempDiv.innerHTML = content;

			// Extract date from article metadata
			const dateElement = tempDiv.querySelector(".post-date");
			const date = dateElement
				? new Date(dateElement.textContent)
				: new Date(0);

			articles.push({
				content: content,
				date: date,
			});
		}

		// Sort articles by date (newest first)
		articles.sort((a, b) => b.date - a.date);

		// Insert sorted articles
		articles.forEach((article) => {
			articleContainer.insertAdjacentHTML("beforeend", article.content);
		});

		setupArticleExpansion();
	}

	// Handle article expansion with improved readability
	function setupArticleExpansion() {
		const articles = document.querySelectorAll(".blog-post");

		articles.forEach((article) => {
			const title = article.querySelector(".post-title");
			const preview = article.querySelector(".preview");
			const full = article.querySelector(".full");

			if (title && preview && full) {
				title.addEventListener("click", (e) => {
					e.preventDefault();
					toggleArticleView(preview, full);
				});
			}
		});
	}

	function toggleArticleView(preview, full) {
		preview.style.display = preview.style.display === "none" ? "block" : "none";
		full.style.display = full.style.display === "none" ? "block" : "none";
	}

	// Handle category selection
	categoryLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const category = e.target.getAttribute("href").replace("#", "");
			loadArticlesByCategory(category);
		});
	});

	// Load default category on page load
	loadArticlesByCategory("all");
});
