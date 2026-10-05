   /* ==========================================
       PRODUCT DATABASE
    ========================================== */

    const products = [

      {
        id: 1,
        name: "Azure Grace Dress",
        category: "Evening",
        price: 2499,
        oldPrice: 3299,
        rating: 4.9,
        badge: "BESTSELLER",
        image:
          "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85"
      },

      {
        id: 2,
        name: "Golden Bloom Dress",
        category: "Party",
        price: 2899,
        oldPrice: 3799,
        rating: 4.8,
        badge: "NEW",
        image:
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85"
      },

      {
        id: 3,
        name: "Midnight Muse Dress",
        category: "Evening",
        price: 3199,
        oldPrice: 4199,
        rating: 4.9,
        badge: "PREMIUM",
        image:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85"
      },

      {
        id: 4,
        name: "Sunshine Day Dress",
        category: "Casual",
        price: 1899,
        oldPrice: 2499,
        rating: 4.7,
        badge: "TRENDING",
        image:
          "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=85"
      },

      {
        id: 5,
        name: "Royal Blue Gown",
        category: "Wedding",
        price: 4999,
        oldPrice: 6499,
        rating: 5.0,
        badge: "EXCLUSIVE",
        image:
          "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=85"
      },

      {
        id: 6,
        name: "Ivory Dream Dress",
        category: "Wedding",
        price: 4299,
        oldPrice: 5599,
        rating: 4.8,
        badge: "NEW",
        image:
          "https://images.unsplash.com/photo-1519657337289-077653f724ed?auto=format&fit=crop&w=800&q=85"
      },

      {
        id: 7,
        name: "Bluebell Mini Dress",
        category: "Casual",
        price: 1599,
        oldPrice: 2199,
        rating: 4.6,
        badge: "",
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85"
      },

      {
        id: 8,
        name: "Golden Hour Dress",
        category: "Party",
        price: 2799,
        oldPrice: 3599,
        rating: 4.9,
        badge: "HOT",
        image:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=85"
      },

      {
        id: 9,
        name: "Sapphire Elegance",
        category: "Evening",
        price: 3499,
        oldPrice: 4499,
        rating: 4.9,
        badge: "PREMIUM",
        image:
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=85"
      },

      {
        id: 10,
        name: "Buttercup Midi Dress",
        category: "Casual",
        price: 1799,
        oldPrice: 2299,
        rating: 4.7,
        badge: "NEW",
        image:
          "https://images.unsplash.com/photo-1506629905607-d9c36f1f0b9a?auto=format&fit=crop&w=800&q=85"
      },

      {
        id: 11,
        name: "Royal Celebration",
        category: "Party",
        price: 2999,
        oldPrice: 3899,
        rating: 4.8,
        badge: "BESTSELLER",
        image:
          "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=85"
      },

      {
        id: 12,
        name: "Pearl White Gown",
        category: "Wedding",
        price: 5599,
        oldPrice: 6999,
        rating: 5.0,
        badge: "EXCLUSIVE",
        image:
          "https://images.unsplash.com/photo-1594030880386-7f60c7d4a0f6?auto=format&fit=crop&w=800&q=85"
      }

    ];


    /* ==========================================
       STATE
    ========================================== */

    let cart =
      JSON.parse(localStorage.getItem("eloraCart")) || [];

    let activeCategory = "All";


    /* ==========================================
       FORMAT MONEY
    ========================================== */

    function money(value) {

      return "₹" + value.toLocaleString("en-IN");

    }


    /* ==========================================
       RENDER PRODUCTS
    ========================================== */

    function renderProducts() {

      const grid =
        document.getElementById("productGrid");

      const search =
        document
          .getElementById("searchInput")
          .value
          .toLowerCase()
          .trim();

      const sort =
        document.getElementById("sortSelect").value;


      let filtered =
        products.filter(product => {

          const categoryMatch =
            activeCategory === "All" ||
            product.category === activeCategory;

          const searchMatch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

          return categoryMatch && searchMatch;

        });


      if (sort === "low") {

        filtered.sort(
          (a, b) => a.price - b.price
        );

      }

      if (sort === "high") {

        filtered.sort(
          (a, b) => b.price - a.price
        );

      }

      if (sort === "rating") {

        filtered.sort(
          (a, b) => b.rating - a.rating
        );

      }


      if (!filtered.length) {

        grid.innerHTML = `
          <div class="no-products">
            <div style="font-size:45px;">👗</div>
            <h3 style="color:#063b73;margin:12px 0;">
              No dresses found
            </h3>
            <p>
              Try another search or collection.
            </p>
          </div>
        `;

        return;

      }


      grid.innerHTML =
        filtered.map(product => {

          const isWishlisted =
            JSON.parse(
              localStorage.getItem("eloraWishlist") || "[]"
            ).includes(product.id);

          return `

            <article class="product">

              <div class="product-image">

                ${
                  product.badge
                    ? `<span class="badge">${product.badge}</span>`
                    : ""
                }

                <button
                  class="wishlist ${isWishlisted ? "active" : ""}"
                  onclick="toggleWishlist(${product.id})">
                  ${isWishlisted ? "♥" : "♡"}
                </button>

                <img
                  src="${product.image}"
                  alt="${product.name}"
                  loading="lazy">

              </div>

              <div class="product-info">

                <div class="product-category">
                  ${product.category}
                </div>

                <h3>
                  ${product.name}
                </h3>

                <div class="rating">
                  ★★★★★
                  <span style="color:#6b7280;">
                    ${product.rating}
                  </span>
                </div>

                <div class="product-bottom">

                  <div>
                    <span class="price">
                      ${money(product.price)}
                    </span>

                    <span class="old-price">
                      ${money(product.oldPrice)}
                    </span>
                  </div>

                  <button
                    class="add-btn"
                    onclick="addToCart(${product.id})">
                    + Add
                  </button>

                </div>

              </div>

            </article>

          `;

        }).join("");

    }


    /* ==========================================
       CATEGORY FILTER
    ========================================== */

    function filterCategory(category) {

      activeCategory = category;

      document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

          button.classList.toggle(
            "active",
            button.dataset.filter === category
          );

        });

      renderProducts();

      document
        .getElementById("shop")
        .scrollIntoView({
          behavior: "smooth"
        });

    }


    /* ==========================================
       ADD TO CART
    ========================================== */

    function addToCart(id) {

      const existing =
        cart.find(item => item.id === id);

      if (existing) {

        existing.quantity++;

      } else {

        cart.push({
          id,
          quantity: 1
        });

      }

      saveCart();

      const product =
        products.find(item => item.id === id);

      showToast(
        `${product.name} added to your cart.`
      );

    }


    /* ==========================================
       CART STORAGE
    ========================================== */

    function saveCart() {

      localStorage.setItem(
        "eloraCart",
        JSON.stringify(cart)
      );

      renderCart();
      updateCartCount();

    }


    /* ==========================================
       UPDATE CART COUNT
    ========================================== */

    function updateCartCount() {

      const count =
        cart.reduce(
          (total, item) =>
            total + item.quantity,
          0
        );

      document.getElementById("cartCount").textContent =
        count;

    }


    /* ==========================================
       CART TOTAL
    ========================================== */

    function getSubtotal() {

      return cart.reduce(
        (total, item) => {

          const product =
            products.find(
              product => product.id === item.id
            );

          return total +
            (product.price * item.quantity);

        },
        0
      );

    }


    function getShipping(subtotal) {

      if (subtotal === 0) return 0;

      return subtotal >= 2999 ? 0 : 99;

    }


    /* ==========================================
       RENDER CART
    ========================================== */

    function renderCart() {

      const container =
        document.getElementById("cartItems");

      if (!cart.length) {

        container.innerHTML = `

          <div class="empty-cart">

            <div class="empty-cart-icon">
              🛍️
            </div>

            <h3 style="color:#063b73;margin-bottom:8px;">
              Your cart is empty
            </h3>

            <p>
              Add your favourite dresses to get started.
            </p>

          </div>

        `;

      } else {

        container.innerHTML =
          cart.map(item => {

            const product =
              products.find(
                product => product.id === item.id
              );

            return `

              <div class="cart-item">

                <img
                  src="${product.image}"
                  alt="${product.name}">

                <div>

                  <h4>
                    ${product.name}
                  </h4>

                  <div class="cart-price">
                    ${money(product.price)}
                  </div>

                  <div class="qty">

                    <button
                      onclick="changeQuantity(${product.id}, -1)">
                      −
                    </button>

                    <span>
                      ${item.quantity}
                    </span>

                    <button
                      onclick="changeQuantity(${product.id}, 1)">
                      +
                    </button>

                  </div>

                  <button
                    class="remove"
                    onclick="removeFromCart(${product.id})">
                    Remove
                  </button>

                </div>

                <strong style="color:#063b73;">
                  ${money(product.price * item.quantity)}
                </strong>

              </div>

            `;

          }).join("");

      }


      const subtotal = getSubtotal();

      const shipping =
        getShipping(subtotal);

      document.getElementById("cartSubtotal")
        .textContent = money(subtotal);

      document.getElementById("cartShipping")
        .textContent =
        shipping === 0
          ? "FREE"
          : money(shipping);

      document.getElementById("cartTotal")
        .textContent =
        money(subtotal + shipping);

    }


    /* ==========================================
       CHANGE QUANTITY
    ========================================== */

    function changeQuantity(id, amount) {

      const item =
        cart.find(item => item.id === id);

      if (!item) return;

      item.quantity += amount;

      if (item.quantity <= 0) {

        cart =
          cart.filter(item => item.id !== id);

      }

      saveCart();

    }


    /* ==========================================
       REMOVE ITEM
    ========================================== */

    function removeFromCart(id) {

      cart =
        cart.filter(item => item.id !== id);

      saveCart();

      showToast("Dress removed from cart.");

    }


    /* ==========================================
       OPEN CART
    ========================================== */

    function openCart() {

      renderCart();

      document
        .getElementById("cartDrawer")
        .classList.add("active");

      document
        .getElementById("overlay")
        .classList.add("active");

      document.body.style.overflow = "hidden";

    }


    /* ==========================================
       CLOSE CART
    ========================================== */

    function closeCart() {

      document
        .getElementById("cartDrawer")
        .classList.remove("active");

      document
        .getElementById("overlay")
        .classList.remove("active");

      document.body.style.overflow = "";

    }


    /* ==========================================
       CHECKOUT
    ========================================== */

    function goToCheckout() {

      if (!cart.length) {

        showToast(
          "Your cart is empty. Add a dress first."
        );

        return;

      }

      closeCart();

      renderCheckout();

      const checkout =
        document.getElementById("checkout");

      checkout.classList.add("show");

      setTimeout(() => {

        checkout.scrollIntoView({
          behavior: "smooth"
        });

      }, 100);

    }


    /* ==========================================
       RENDER CHECKOUT
    ========================================== */

    function renderCheckout() {

      const container =
        document.getElementById("checkoutItems");

      container.innerHTML =
        cart.map(item => {

          const product =
            products.find(
              product => product.id === item.id
            );

          return `

            <div class="checkout-summary-item">

              <span>
                ${product.name}
                × ${item.quantity}
              </span>

              <strong>
                ${money(
                  product.price * item.quantity
                )}
              </strong>

            </div>

          `;

        }).join("");


      const subtotal =
        getSubtotal();

      const shipping =
        getShipping(subtotal);

      document.getElementById(
        "checkoutSubtotal"
      ).textContent = money(subtotal);

      document.getElementById(
        "checkoutShipping"
      ).textContent =
        shipping === 0
          ? "FREE"
          : money(shipping);

      document.getElementById(
        "checkoutTotal"
      ).textContent =
        money(subtotal + shipping);

    }


    /* ==========================================
       PLACE ORDER
    ========================================== */

    document
      .getElementById("checkoutForm")
      .addEventListener(
        "submit",
        function(event) {

          event.preventDefault();

          if (!cart.length) {

            showToast(
              "Your cart is empty."
            );

            return;

          }


          const name =
            document.getElementById(
              "customerName"
            ).value.trim();

          const payment =
            document.querySelector(
              'input[name="payment"]:checked'
            ).value;


          const orderNumber =
            "ELORA-" +
            Date.now()
              .toString()
              .slice(-8);


          const total =
            getSubtotal() +
            getShipping(getSubtotal());


          const order = {

            orderNumber,

            customer: {
              name,
              phone:
                document.getElementById(
                  "customerPhone"
                ).value,

              email:
                document.getElementById(
                  "customerEmail"
                ).value,

              pin:
                document.getElementById(
                  "customerPin"
                ).value,

              address:
                document.getElementById(
                  "customerAddress"
                ).value,

              city:
                document.getElementById(
                  "customerCity"
                ).value,

              state:
                document.getElementById(
                  "customerState"
                ).value
            },

            payment,

            items: cart,

            total,

            date:
              new Date().toISOString()

          };


          const orders =
            JSON.parse(
              localStorage.getItem(
                "eloraOrders"
              ) || "[]"
            );

          orders.push(order);

          localStorage.setItem(
            "eloraOrders",
            JSON.stringify(orders)
          );


          document.getElementById(
            "successMessage"
          ).innerHTML = `
            Thank you, <strong>${name}</strong>!<br><br>
            Your order
            <strong>${orderNumber}</strong>
            has been placed successfully.<br><br>
            Total:
            <strong>${money(total)}</strong><br>
            Payment:
            <strong>${payment}</strong>
          `;


          cart = [];

          saveCart();

          document
            .getElementById("checkout")
            .classList.remove("show");

          document
            .getElementById("successModal")
            .classList.add("show");

          this.reset();

          document
            .querySelectorAll(".payment-option")
            .forEach((option, index) => {

              option.classList.toggle(
                "selected",
                index === 0
              );

            });

        }
      );


    /* ==========================================
       PAYMENT SELECTION
    ========================================== */

    document
      .querySelectorAll(".payment-option")
      .forEach(option => {

        option.addEventListener(
          "click",
          function() {

            document
              .querySelectorAll(
                ".payment-option"
              )
              .forEach(item =>
                item.classList.remove(
                  "selected"
                )
              );

            this.classList.add("selected");

            const radio =
              this.querySelector(
                'input[type="radio"]'
              );

            radio.checked = true;

          }
        );

      });


    /* ==========================================
       WISHLIST
    ========================================== */

    function toggleWishlist(id) {

      let wishlist =
        JSON.parse(
          localStorage.getItem(
            "eloraWishlist"
          ) || "[]"
        );


      if (wishlist.includes(id)) {

        wishlist =
          wishlist.filter(
            item => item !== id
          );

        showToast(
          "Removed from wishlist."
        );

      } else {

        wishlist.push(id);

        showToast(
          "Added to wishlist ♥"
        );

      }


      localStorage.setItem(
        "eloraWishlist",
        JSON.stringify(wishlist)
      );

      renderProducts();

    }


    /* ==========================================
       TOAST
    ========================================== */

    let toastTimer;

    function showToast(message) {

      const toast =
        document.getElementById("toast");

      toast.textContent = message;

      toast.classList.add("show");

      clearTimeout(toastTimer);

      toastTimer =
        setTimeout(() => {

          toast.classList.remove("show");

        }, 2500);

    }


    /* ==========================================
       SUCCESS MODAL
    ========================================== */

    function closeSuccess() {

      document
        .getElementById("successModal")
        .classList.remove("show");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }


    /* ==========================================
       MOBILE MENU
    ========================================== */

    function toggleMenu() {

      document
        .getElementById("navLinks")
        .classList.toggle("show");

    }


    document
      .querySelectorAll(".nav-links a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            document
              .getElementById("navLinks")
              .classList.remove("show");

          }
        );

      });


    /* ==========================================
       SEARCH SCROLL
    ========================================== */

    function scrollToShop() {

      document
        .getElementById("shop")
        .scrollIntoView({
          behavior: "smooth"
        });

      setTimeout(() => {

        document
          .getElementById("searchInput")
          .focus();

      }, 600);

    }


    /* ==========================================
       INITIALIZE
    ========================================== */

    renderProducts();

    renderCart();

    updateCartCount();


    /* ==========================================
       IMAGE FALLBACK
    ========================================== */

    document.addEventListener(
      "error",
      function(event) {

        if (
          event.target.tagName === "IMG"
        ) {

          event.target.src =
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80";

        }

      },
      true
    );

  