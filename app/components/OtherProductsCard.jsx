import {
  Card,
  Typography,
} from "@material-tailwind/react";

export default function OtherProductsCard() {
  return (
    <Card className="w-full max-w-sm overflow-hidden rounded shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src="https://f000.backblazeb2.com/file/recipekit-bucket/20230502144252-cebu-style-lechon.jpg"
          alt="Cebu Style Lechon"
          className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <div className="flex flex-col items-center justify-between">
          <Typography
            color="blue-gray"
            className="text-base font-semibold truncate"
          >
            Cebu Style Lechon
          </Typography>
          <Typography
            color="red"
            className="text-base font-semibold"
          >
            $349.00
          </Typography>
        </div>
      </div>
    </Card>
  );
}
