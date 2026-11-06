export function sortItems(items, sort) {
    if (!sort) return [...items]

    const descending = sort.startsWith('-')
    const field = descending ? sort.slice(1) : sort

    return [...items].sort((a, b) => {
        const first = a[field]
        const second = b[field]

        if (first === second) return 0
        if (first === undefined || first === null) return 1
        if (second === undefined || second === null) return -1

        const result = String(first).localeCompare(String(second), undefined, {
            numeric: true,
            sensitivity: 'base',
        })
        return descending ? -result : result
    })
}

export function paginate(items, { page, limit, offset }) {
    const total = items.length

    return {
        data: items.slice(offset, offset + limit),
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    }
}
