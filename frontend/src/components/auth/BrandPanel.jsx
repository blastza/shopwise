import { ShoppingCart } from 'lucide-react'

const BrandPanel = () => {
  return (
    <div className="hidden w-full bg-blue-600 p-10 text-white md:flex md:w-1/2 md:flex-col md:justify-between">
      <div className="flex h-full flex-col justify-center">
        <h1 className="text-3xl font-bold tracking-tight">
          ShopWise
        </h1>

        <p className="mt-6 text-5xl font-bold leading-tight tracking-tight">
            Shop smarter.
            <br />
            Live better.
        </p>

        <p className="mt-5 max-w-sm text-base leading-7 text-blue-100">
          Discover products, manage your cart, and enjoy a simple
          shopping experience.
        </p>
        <div className="mt-10 flex h-32 w-32 items-center justify-center rounded-full bg-white/10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                <ShoppingCart size={40} strokeWidth={1.5} />
            </div>
        </div>
      </div>

      <p className="text-sm text-blue-200">
        Your smarter way to shop.
      </p>
    </div>
  );
};

export default BrandPanel;