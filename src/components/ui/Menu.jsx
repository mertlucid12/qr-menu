import { Card, CardContent } from "@/components/ui/card";
import { menu } from "../data/menu";
import { useRef, useState, useEffect } from "react";

export default function Menu() {
  const refs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCategory = (index) => {
    refs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  // 🔥 SCROLL TAKİP
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      refs.current.forEach((el, index) => {
        if (!el) return;

        const offsetTop = el.offsetTop - 100;
        const offsetBottom = offsetTop + el.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="p-4">
      {/* 🔥 NAVBAR */}
      <div className="sticky top-0 bg-black z-50 mb-4 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {menu.map((cat, i) => (
            <button
              key={i}
              onClick={() => scrollToCategory(i)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition
                ${
                  activeIndex === i
                    ? "bg-orange-500 text-white"
                    : "bg-zinc-800 text-gray-300"
                }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 MENU LIST */}
      <div className="space-y-8">
        {menu.map((cat, i) => (
          <div key={i} ref={(el) => (refs.current[i] = el)}>
            <h2 className="text-2xl font-bold mb-3">{cat.category}</h2>

            <div className="grid gap-3">
              {cat.items.map((item, j) => (
                <Card key={j}>
                  <CardContent className="flex justify-between items-center p-4">
                    <span>{item.name}</span>
                    <span className="font-semibold">₺{item.price}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}