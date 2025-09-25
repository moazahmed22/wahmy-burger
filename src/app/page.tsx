import MainSlider from "@/components/MainSlider/MainSlider";
import ProductsShoppingSection from "@/components/ShoppingSectionComp/ProductsShoppingSectionComp";
import { ShoppingSection } from "@/components/ShoppingSectionComp/ShoppingSectionComp";
import { Bike, Hamburger, Phone } from "lucide-react";
// importing data
import categories from "@/../public/data/wahmy-categories.json";
import products from "@/../public/data/wahmy-products.json";

export default async function Home() {
  return (
    <>
      <div className="container mx-auto px-1 md:px-0">
        <div id="main-slider" className="scroll-mt-[104px]">
          <MainSlider />
        </div>
        {/* render categories */}
        <section id="categories-section" className="scroll-mt-[104px]">
          <ShoppingSection sectionTitle="categories" sectionData={categories} />
        </section>
        {/* render 8 products */}
        <section id="products-section" className="scroll-mt-[104px]">
          <ProductsShoppingSection
            sectionTitle="products"
            sectionData={products.slice(0, 8)}
          />
        </section>
        {/* hero section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10">
          <div className="flex flex-col text-center items-center gap-1">
            <div className="icon-container relative w-16 h-16 flex justify-center items-center rounded-full bg-primary mb-7 shadow-[0_0_0_10px] shadow-primary/50">
              <Bike className="text-background z-[1]" />
            </div>
            {/* content */}
            <p className="capitalize font-bold">Free & Fast Delivery</p>
            <p className="text-sm font-medium">
              Enjoy free delivery on all orders over EGP 200.
            </p>
          </div>

          <div className="flex flex-col text-center items-center gap-1">
            <div className="icon-container relative w-16 h-16 flex justify-center items-center rounded-full bg-primary mb-7 shadow-[0_0_0_10px] shadow-primary/50">
              <Phone className="text-background z-[1]" />
            </div>
            {/* content */}
            <p className="capitalize font-bold">Hotline Support</p>
            <p className="text-sm font-medium">
              Call us anytime during opening hours for help with your order.
            </p>
          </div>

          <div className="flex flex-col text-center items-center gap-1">
            <div className="icon-container relative w-16 h-16 flex justify-center items-center rounded-full bg-primary mb-7 shadow-[0_0_0_10px] shadow-primary/50">
              <Hamburger className="text-background z-[1]" />
            </div>
            {/* content */}
            <p className="uppercase font-bold">
              Freshness & Accuracy Guarantee
            </p>
            <p className="text-sm font-medium">
              If your order is incorrect or unsatisfactory, we’ll replace it
              immediately or provide a credit for your next meal.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
