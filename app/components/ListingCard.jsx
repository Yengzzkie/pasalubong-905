import { getTimeAgo } from "../../lib/getTimeAgo";

const ListingCard = ({ postData }) => {
  const maxLength = 120;

  const content =
    postData.content.length > maxLength
      ? postData.content.slice(0, maxLength) + "..."
      : postData.content;

  return (
    <div className="flex gap-4 w-full h-auto mx-auto p-6 bg-white shadow-md lg:rounded-lg mb-4 border-t-1 border-zinc-200">
      <div className="w-36 h-36 flex-shrink-0">
        <img
          src={postData?.image[0]}
          alt="Listing"
          className="w-full h-full object-cover rounded border border-gray-200"
        />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-md font-semibold">{postData.title}</h2>

        <p className="text-gray-700 text-xs lg:text-sm">
          {content}
          {postData.content.length > maxLength && (
            <span className="text-blue-500 ml-1 hover:underline">
              Read more
            </span>
          )}
        </p>

        <div className="flex gap-4 text-zinc-500 text-sm mt-auto">
          <p>{getTimeAgo(postData.createdAt)}</p> {"|"}
          <p>
            {postData?.location?.city},{" "}
            {postData?.location?.province || postData?.location?.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
