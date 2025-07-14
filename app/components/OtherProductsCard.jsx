import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function OtherProductsCard() {
  return (
    <Card className="flex w-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out rounded">
      
      <div className="relative h-48 w-full">
        <img
          src="https://f000.backblazeb2.com/file/recipekit-bucket/20230502144252-cebu-style-lechon.jpg"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            Cebu Style Lechon
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            $349.00
          </Typography>
        </div>
      </div>
    </Card>
  );
}
