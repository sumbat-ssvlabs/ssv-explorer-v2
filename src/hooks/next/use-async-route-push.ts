"use client"

import { useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

// Define the type for the observer callback function
type ObserverCallback = () => void

const createRouteObserver = () => {
  let observer: ObserverCallback | null = null

  const setObserver = (callback: ObserverCallback) => {
    observer = callback
  }

  const notify = () => {
    if (observer) {
      observer()
    }
  }

  return { setObserver, notify }
}

const routeObserver = createRouteObserver()

export const useAsyncRoutePush = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const asynPush = async (path: string) => {
    return new Promise<void>((resolve) => {
      startTransition(() => {
        router.push(path)
      })

      routeObserver.setObserver(() => {
        resolve()
      })
    })
  }

  useEffect(() => {
    if (!isPending) {
      routeObserver.notify()
    }
  }, [isPending])

  return useMutation({
    mutationFn: asynPush,
  })
}
