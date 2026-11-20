document.addEventListener("DOMContentLoaded", () => {
  // 1. PRODUCT PAGE: Pass selected Color & Size to the ORDER NOW link
  const productOrderForm = document.getElementById("productOrderForm");
  const orderNowBtn = document.querySelector(".btn-order-now");

  if (productOrderForm && orderNowBtn) {
    const baseHref = orderNowBtn.getAttribute("href").split("?")[0];

    const updateOrderLink = () => {
      const selectedColor = productOrderForm.querySelector('input[name="shirtColor"]:checked')?.value || "";
      const selectedSize = productOrderForm.querySelector('input[name="shirtSize"]:checked')?.value || "";

      const params = new URLSearchParams();
      if (selectedColor) params.set("color", selectedColor);
      if (selectedSize) params.set("size", selectedSize);

      orderNowBtn.setAttribute("href", `${baseHref}?${params.toString()}`);
    };

    productOrderForm.querySelectorAll('input[name="shirtColor"], input[name="shirtSize"]').forEach((input) => {
      input.addEventListener("change", updateOrderLink);
    });

    updateOrderLink();
  }

  // 2. ORDER FORM PAGE: Pre-select Color & Size from URL parameters
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    const params = new URLSearchParams(window.location.search);
    const incomingColor = params.get("color");
    const incomingSize = params.get("size");

    const colorMap = {
      Beige: "Warm Tan",
      Blue: "Slate Blue",
      Charcoal: "Charcoal",
    };

    if (incomingColor) {
      const mappedColor = colorMap[incomingColor] || incomingColor;
      const colorRadio = orderForm.querySelector(`input[name="color"][value="${mappedColor}"]`);
      if (colorRadio) {
        colorRadio.checked = true;
        colorRadio.dispatchEvent(new Event("change"));
      }
    }

    if (incomingSize) {
      const sizeRadio = orderForm.querySelector(`input[name="size"][value="${incomingSize}"]`);
      if (sizeRadio) {
        sizeRadio.checked = true;
        sizeRadio.dispatchEvent(new Event("change"));
      }
    }
  }
});