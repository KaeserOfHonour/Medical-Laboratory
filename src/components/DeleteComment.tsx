"use client";

import { api } from "@/trpc/react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    id: string;
}

const DeleteComment = ({ id }: Props) => {
    const router = useRouter();
    const { mutate } = api.service.deleteComment.useMutation({
        onSuccess: () => {
            toast.success("Comment deleted successfully");
            router.refresh();
        },
        onError: () => {
            toast.error("Failed to delete comment");
        },
    });
    return (
        <Trash
            onClick={() => mutate({ id })}
            size={24}
            className="ml-auto cursor-pointer text-destructive transition-colors hover:text-destructive/75"
        />
    );
};
export default DeleteComment;
