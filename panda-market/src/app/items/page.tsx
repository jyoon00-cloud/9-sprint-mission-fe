
import { getProducts } from "@/lib/api/products";
import ItemList from "@/components/ui/itemList";

export default async function ItemsHome() {
  const initialProductsData = await getProducts({ orderBy: "recent" });
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-400 ">
        <div className="flex flex-col mx-20 mb-10">
          <ItemList initialProducts={initialProductsData.data || []} />
        </div>
      </div>
    </div>
  );
}
