import { useState } from "react"

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetData = async () => {
        try {
            
        } catch (err) {
            // @ts-ignore
            setError(err instanceof Error ? err : new Error('An Error Occured'));
        } finally {
            setLoading(false)
        }
    }
}