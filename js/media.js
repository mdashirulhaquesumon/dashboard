 // --- Fake API for demonstration ---
 function fakeSearchAPI(query) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const fakeData = {
          results: [
            { 
              id: 1, 
              title: "Coffee Shop", 
              image: "img/coffee-with-friends.jpg", 
              view: "https://example.com/view/1", 
              description: "A beautiful coffee shop with a cozy atmosphere.", 
              size: "400 x 300", 
              aspectRatio: "4:3" 
            },
            { 
              id: 2, 
              title: "Coffee Beans", 
              image: "img/coffee-making.jpg", 
              view: "https://example.com/view/2", 
              description: "High-quality, freshly roasted coffee beans.", 
              size: "350 x 350", 
              aspectRatio: "1:1" 
            },
            { 
              id: 3, 
              title: "Coffee Maker", 
              image: "img/coffee-maker.jpg", 
              view: "https://example.com/view/3", 
              description: "A mug that perfectly fits your hand for a great coffee experience.", 
              size: "300 x 400", 
              aspectRatio: "3:4" 
            },
            { 
              id: 4, 
              title: "Coffee Cup", 
              image: "img/coffee-with-cup.jpg", 
              view: "https://example.com/view/2", 
              description: "High-quality, freshly roasted coffee beans.", 
              size: "350 x 350", 
              aspectRatio: "1:1" 
            },
            { 
              id: 5, 
              title: "Coffee dumlao", 
              image: "img/nathan-dumlao.jpg", 
              view: "https://example.com/view/3", 
              description: "A mug that perfectly fits your hand for a great coffee experience.", 
              size: "300 x 400", 
              aspectRatio: "3:4" 
            },
            { 
              id: 6, 
              title: "Coffee Beans", 
              image: "img/coffee-making.jpg", 
              view: "https://example.com/view/2", 
              description: "High-quality, freshly roasted coffee beans.", 
              size: "350 x 350", 
              aspectRatio: "1:1" 
            },
            { 
              id: 7, 
              title: "Coffee Mug", 
              image: "img/coffee-maker.jpg", 
              view: "https://example.com/view/3", 
              description: "A mug that perfectly fits your hand for a great coffee experience.", 
              size: "300 x 400", 
              aspectRatio: "3:4" 
            },
            { 
              id: 8, 
              title: "Coffee Beans", 
              image: "img/pablo-merchan-mont.jpg", 
              view: "https://example.com/view/2", 
              description: "High-quality, freshly roasted coffee beans.", 
              size: "350 x 350", 
              aspectRatio: "1:1" 
            }
          ]
        };

        resolve(fakeData);
      }, 1200);
    });
  }

  let currentResults = [];

  // --- Search Button Handler ---
  document.getElementById("searchButton").addEventListener("click", function () {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    const resultsContainer = document.getElementById("resultsContainer");
    const loading = document.getElementById("loading");
    const detailPanel = document.getElementById("detailPanel");

    // Clear previous results and reset detail panel.
    resultsContainer.innerHTML = "";
    detailPanel.innerHTML = `<p class="has-text-grey">Select an image to see details and tools here.</p>`;
    loading.classList.remove("is-hidden");

    fakeSearchAPI(query)
      .then(data => {
        loading.classList.add("is-hidden");
        currentResults = data.results;

        if (data.results && data.results.length > 0) {
          resultsContainer.innerHTML = data.results.map((item, index) => {
            // Extract Image Name and Format
            const imageUrlParts = item.image.split('/');
            const imageName = imageUrlParts[imageUrlParts.length - 1].split('.')[0];
            const imageFormat = imageUrlParts[imageUrlParts.length - 1].split('.')[1].toUpperCase();

            return `
              <div class="column is-one-quarter">
                <div class="card view-button p-3" data-index="${index}">
                 
                  <!-- Icon for Dropdown -->
                  <div class="card-footer is-flex is-justify-content-space-between is-align-items-center">
                     <p class="title is-7 mb-0">${item.title}</p>
                    <div class="dropdown is-right">
                      <div class="dropdown-trigger">
                        <button class="button p-0 is-text" aria-haspopup="true" aria-controls="dropdown-menu-${index}">
                          <span><i class="bi bi-three-dots-vertical is-7"></i></span>
                        </button>
                      </div>
                      <div class="dropdown-menu" id="dropdown-menu-${index}" role="menu">
                        <div class="dropdown-content">
                          <a href="#" class="dropdown-item">Option 1</a>
                          <a href="#" class="dropdown-item">Option 2</a>
                          <a href="#" class="dropdown-item">Option 3</a>
                        </div>
                      </div>
                    </div>
                  </div>
                   <div class="card-image">
                    <figure class="image is-4by3">
                      <img src="${item.image}" alt="${item.title}">
                    </figure>
                  </div>
                  <div class="card-content p-0">
                   
                    <p class="has-text-grey is-size-7">Name: ${imageName}</p>
                    <p class="has-text-grey is-size-7">Format: ${imageFormat}</p>
                  </div>
                </div>
              </div>
            `;
          }).join('');
        } else {
          resultsContainer.innerHTML = `<p class="has-text-info">No results found.</p>`;
        }
      })
      .catch(error => {
        console.error("Error fetching results:", error);
        loading.classList.add("is-hidden");
        resultsContainer.innerHTML = `<p class="has-text-danger">Error: ${error.message}</p>`;
      });
  });

  // --- Delegate View Button Clicks ---
  document.getElementById("resultsContainer").addEventListener("click", function(event) {
    const viewButton = event.target.closest('.view-button');
    if (viewButton) {
      const index = viewButton.getAttribute("data-index");
      const item = currentResults[index];
      if (item) {
        showDetail(item);
      }
    }

    // Handle dropdown toggle
    const dropdownTrigger = event.target.closest('.dropdown-trigger');
    if (dropdownTrigger) {
      const dropdownMenu = dropdownTrigger.closest('.dropdown').querySelector('.dropdown-menu');
      dropdownMenu.classList.toggle('is-active');
    }
  });

  // --- Detail Panel Function ---
  function showDetail(item) {
    const detailPanel = document.getElementById("detailPanel");
    detailPanel.innerHTML = `
      <div class="">
        <figure class="image">
          <img id="detailImage" src="${item.image}" alt="${item.title}">
        </figure>
        <h2 class="title is-4 mt-3">${item.title}</h2>
        <p>${item.description}</p>
        <hr>
        <div class="detail-section">
          <h3>Image Details</h3>
          <p><strong>Size:</strong> ${item.size}</p>
          <p><strong>Aspect Ratio:</strong> ${item.aspectRatio}</p>
        </div>
        <div class="detail-section mt-5">
          <h3>AI Tools</h3>
          <div class="buttons mt-2">
            <button class="button is-primary is-fullwidth">Animate Image</button>
            <button class="button is-primary is-fullwidth">Find Similar Images</button>
            <button class="button is-primary is-fullwidth">Enhance Quality</button>
            <button class="button is-primary is-fullwidth">Remove Background</button>
          </div>
        </div>
        <div class="detail-section mt-5">
          <h3>Other Actions</h3>
          <div class="buttons mt-2">
            <button class="button is-info is-fullwidth">Download</button>
            <button class="button is-info is-fullwidth">Share</button>
            <button class="button is-info is-fullwidth">Edit Metadata</button>
          </div>
        </div>
      </div>
    `;
  }

  // Trigger search on Enter key press
  document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      document.getElementById("searchButton").click();
    }
  });