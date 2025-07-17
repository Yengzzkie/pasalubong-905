import {
  Card,
  Typography,
} from "@material-tailwind/react";

export default function OtherProductsCard({ item }) {
  console.log("OtherProductsCard item:", item);
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={item.image[0]}
          alt={item.item_name}
          className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center justify-between">
          <Typography
            color="blue-gray"
            className="text-base font-semibold truncate"
          >
            {item.item_name}
          </Typography>
          <Typography
            color="red"
            className="text-base font-semibold"
          >
            ${item.price}
          </Typography>
        </div>
      </div>
    </Card>
  );
}
