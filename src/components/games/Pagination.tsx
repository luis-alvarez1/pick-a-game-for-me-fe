import React from "react";
import { Button } from "../ui/Button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
        <div className="flex justify-center mt-8 gap-2">
            <Button
                variant="outline"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            >
                First
            </Button>
            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ←
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                    (p) =>
                        p === 1 ||
                        p === totalPages ||
                        (p >= currentPage - 1 && p <= currentPage + 1)
                )
                .map((p, index, array) => {
                    if (index > 0 && array[index - 1] !== p - 1) {
                        return (
                            <span key={`ellipsis-${p}`} className="px-2">
                                ...
                            </span>
                        );
                    }
                    return (
                        <Button
                            key={p}
                            variant={p === currentPage ? "primary" : "outline"}
                            onClick={() => onPageChange(p)}
                            disabled={p === currentPage}
                        >
                            {p}
                        </Button>
                    );
                })}
            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                →
            </Button>
            <Button
                variant="outline"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                Last
            </Button>
        </div>
    );
};
