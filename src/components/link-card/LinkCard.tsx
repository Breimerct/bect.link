import IconCopy from "@components/icons/IconCopy";
import { cn, formatDate, getDomain } from "@/helpers/utils";
import { type LiHTMLAttributes } from "react";
import type { Link } from "@/types/link.type";
import { toast } from "sonner";

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  link: Link;
}

export default function LinkCard({ link, className, ...props }: Props) {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(link.shortLink)
      .then(() => {
        toast.success("Link copied to clipboard!", {
          description: "You can now paste it anywhere.",
        });
      })
      .catch((err) => {
        toast.error("Failed to copy link!", {
          description: "Please try again.",
        });
        console.error("Failed to copy link:", err);
      });
  };

  const extractOrigin = (url: string) => {
    const urlObj = new URL(url);
    return urlObj.origin;
  };

  return (
    <li
      data-short={link.shortLink}
      {...props}
      className={cn(
        "p-4 bg-white rounded-lg shadow-md",
        "flex flex-col gap-2",
        "border border-gray-200",
        "dark:bg-gray-700 dark:border-gray-700",
        "dark:text-gray-200",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold w-full text-nowrap overflow-hidden text-ellipsis">
            {getDomain(link.url)}
          </h1>
        </div>

        <div>
          <button
            onClick={handleCopy}
            type="button"
            className={cn(
              "btn-copy",
              "text-gray-500 cursor-pointer",
              "hover:text-gray-700 hover:scale-105",
              "transition-all duration-200 ease-in-out",
              "dark:text-gray-400 dark:hover:text-gray-200",
            )}
          >
            <IconCopy />
          </button>
        </div>
      </div>
      <h1 className="text-lg font-semibold w-full text-nowrap overflow-hidden text-ellipsis">
        <span className="bg-gray-200 text-gray-800 font-semibold mr-1 px-1.5 py-0.5 rounded dark:bg-gray-800 dark:text-gray-300 text-sm">
          {extractOrigin(link.shortLink)}/
        </span>
        <a
          href={link.shortLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-slate-900 dark:text-slate-200 font-semibold",
            "transition-all duration-200 ease-in-out",
            "hover:underline",
          )}
        >
          <span className="">{link.slug}</span>
        </a>
      </h1>

      <div className="flex items-center justify-between gap-2">
        <small>
          <time>{formatDate(link.createdAt)}</time>
        </small>

        <div>
          <span className="text-gray-500">{link.clickCount}</span>
          <span className="text-gray-500"> clicks</span>
        </div>
      </div>
    </li>
  );
}
