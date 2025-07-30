import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../Services/productService";
import { HiOutlineXMark } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";

function DetailProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0); // 0: default color
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", err);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
      return;
    }

    const userId = localStorage.getItem("userId");
    const existingCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];

    const foundIndex = existingCart.findIndex(
      (item) => item.productId === product.productId && item.selectedSize === selectedSize
    );

    if (foundIndex !== -1) {
      existingCart[foundIndex].quantity += 1;
    } else {
      existingCart.push({
        ...product,
        quantity: 1,
        selectedSize,
      });
    }

    localStorage.setItem(`cart_${userId}`, JSON.stringify(existingCart));
    navigate("/home", { state: { showMiniCart: true } });
  };

  if (!product) {
    return <p className="text-center py-10">Đang tải chi tiết sản phẩm...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-5xl w-full">
        {/* Image */}
        <div className="md:w-1/2 p-6">
          <img
            src={product.producImgUrl}
            alt={product.productName}
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-6 relative">
          <button
            onClick={() => navigate("/home")}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <HiOutlineXMark size={24} />
          </button>

          <h1 className="text-2xl font-semibold mb-2">{product.productName}</h1>
          <p className="text-lg text-gray-700 mb-2">{product.productPrice} VND</p>

          {/* Rating */}
          <div className="flex items-center text-sm mb-4">
            <span className="text-yellow-400 flex">
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} />
              ))}
              <FaStar className="text-gray-300" />
            </span>
            <span className="ml-2 text-gray-600">3.9</span>
            <span className="mx-2 text-gray-300">•</span>
            <a href="#" className="text-indigo-600 hover:underline">
              See all 512 reviews
            </a>
          </div>

          {/* Color */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Color</h4>
            <div className="flex gap-3">
              {[ "#0f172a", "#cbd5e1" ].map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === index ? "border-gray-900" : "border-transparent"}`}
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-900">Size</h4>
              <a href="#" className="text-sm text-indigo-600 hover:underline">Size guide</a>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {["XXS", "XS", "S", "M", "L", "XL"].map((size) => {
                const isAvailable = product.size?.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => isAvailable && setSelectedSize(size)}
                    className={`border text-sm py-2 rounded-md ${
                      selectedSize === size ? "bg-indigo-600 text-white" : ""
                    } ${!isAvailable ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "hover:border-indigo-600"}`}
                    disabled={!isAvailable}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to bag */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md text-center font-semibold"
          >
            Add to bag
          </button>

          {/* View details */}
          <div className="mt-4 text-center">
            <a href="#" className="text-indigo-600 hover:underline text-sm">
              View full details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
