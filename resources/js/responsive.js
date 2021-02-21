function load()
{
	let contents;
// Set viewport
	const viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute(
		"content",
		"width=device-width, initial-scale=1, shrink-to-fit=no"
	);

	// Add hidden class to sidebar
	const sidebar = document.querySelector(".w-sidebar");
	sidebar.classList.add("sidebar-hidden");

	// Add hamburger menu to header
	const hamburger = document.createElement("span");
	hamburger.className = "hamburger-menu";

	const contentHeader = document.querySelector(".content .h-header");
	contentHeader.prepend(hamburger);

	// Hamburger click event
	hamburger.addEventListener(
		"click",
		function(e)
		{
			e.stopPropagation();
			const sidebar = document.querySelector(".w-sidebar");
			sidebar.classList.toggle("sidebar-hidden");
		},
		true
	);

	const sidebarLinks = document.querySelectorAll(
		".w-sidebar a, .w-sidebar .cursor-pointer:not(.nc-head), .w-sidebar .nc-item-link"
	);

	sidebarLinks.forEach(function(sidebarLink)
	{
		sidebarLink.addEventListener(
			"click",
			function()
			{
				const sidebar = document.querySelector(".w-sidebar");

				sidebar.classList.add("sidebar-hidden");
			},
			false
		);
	});

	// Hide sidebar when clicking outside
	const rootElements = document.querySelectorAll("body,html");

	rootElements.forEach(function(rootElement)
	{
		rootElement.addEventListener("click", function(e)
		{
			const sidebar = document.querySelector(".w-sidebar");

			if(e.target !== sidebar && !sidebar.contains(e.target))
			{
				sidebar.classList.add("sidebar-hidden");
			}
		});
	});

	// Config based theme tweaking
	if(Nova.config.mmns)
	{
		// Hide sidebar headlines
		const sidebarHeadlines = document.querySelectorAll(".w-sidebar h4");

		sidebarHeadlines.forEach(function(sidebarHeadline)
		{
			if(
				Nova.config.mmns.hide_all_sidebar_headlines ||
				Nova.config.mmns.hidden_sidebar_headlines.indexOf(
					sidebarHeadline.textContent
				) !== -1
			)
			{
				sidebarHeadline.classList.add("hidden");
			}
		});

		// Sticky resource table actions
		if(Nova.config.mmns.resource_tables_sticky_actions)
		{
			contents = document.querySelectorAll(".content");

			contents.forEach(function(content)
			{
				content.classList.add("sticky-actions");
			});
		}
		if(Nova.config.mmns.resource_tables_sticky_actions_on_mobile)
		{
			contents = document.querySelectorAll(".content");

			contents.forEach(function(content)
			{
				content.classList.add("sticky-actions-on-mobile");
			});
		}

		// Hide "Update & Continue Editing" button
		if(Nova.config.mmns.hide_update_and_continue_editing_button)
		{
			contents = document.querySelectorAll(".content");

			contents.forEach(function(content)
			{
				content.classList.add(
					"hide-update-and-continue-editing-button"
				);
			});
		}
		if(
			Nova.config.mmns.hide_update_and_continue_editing_button_on_mobile
		)
		{
			contents = document.querySelectorAll(".content");

			contents.forEach(function(content)
			{
				content.classList.add(
					"hide-update-and-continue-editing-button-on-mobile"
				);
			});
		}

		// Fixed sidebar on desktop
		if(Nova.config.mmns.fixed_sidebar)
		{
			document.querySelector("body").classList.add("fixed-sidebar");
		}
	}
}

document.addEventListener("DOMContentLoaded", load, false);
