"use client";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import {PostProps} from "@/types/PostProps";

interface PostContextType {
    post: PostProps[] | null;
    setPost: React.Dispatch<React.SetStateAction<PostProps[] | null>>;
}
const PostContext = createContext<PostContextType | undefined>(undefined);

type PostInterface = {
    children: ReactNode;
};

export const PostProvider = ({ children }: PostInterface) => {
    const [post, setPost] = useState<PostProps[] | null>(null);

    return (
        <PostContext.Provider value={{ post, setPost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePost = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usepost must be used within an postProvider");
    }
    return context;
};
