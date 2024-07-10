import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropOptions() {
  return (
    <section className="flex justify-evenly items-center py-5 w-full">
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">Select Category</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">Select Level</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Level</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="px-7 py-4 w-1/3 mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex outline-none justify-between w-full px-10 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:text-gray-100">Select Type</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
