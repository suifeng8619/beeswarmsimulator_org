'use client'

import { useState, useRef, useCallback } from 'react'

interface UseHistoryOptions {
  maxHistory?: number
}

interface UseHistoryReturn<T> {
  state: T
  setState: (update: T | ((prev: T) => T)) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  clearHistory: () => void
}

/**
 * Custom hook for managing state with undo/redo functionality
 * @param initialState - The initial state value
 * @param options - Configuration options
 * @returns State management utilities with undo/redo
 */
export function useHistory<T>(
  initialState: T,
  options: UseHistoryOptions = {}
): UseHistoryReturn<T> {
  const { maxHistory = 50 } = options

  const [state, setStateInternal] = useState<T>(initialState)
  const [history, setHistory] = useState<T[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const isUndoRedoRef = useRef(false)

  // Wrapped setState that records history
  const setState = useCallback((update: T | ((prev: T) => T)) => {
    setStateInternal(prev => {
      const newState = typeof update === 'function'
        ? (update as (prev: T) => T)(prev)
        : update

      // Don't record history for undo/redo operations or if no change
      if (isUndoRedoRef.current || JSON.stringify(newState) === JSON.stringify(prev)) {
        return newState
      }

      // Record to history
      setHistory(h => {
        const newHistory = h.slice(0, historyIndex + 1)
        newHistory.push(prev) // Save previous state
        if (newHistory.length > maxHistory) {
          newHistory.shift()
          return newHistory
        }
        return newHistory
      })
      setHistoryIndex(i => Math.min(i + 1, maxHistory - 1))

      return newState
    })
  }, [historyIndex, maxHistory])

  // Undo function
  const undo = useCallback(() => {
    if (historyIndex < 0) return
    isUndoRedoRef.current = true
    const prevState = history[historyIndex]
    setHistory(h => [...h, state]) // Save current for redo
    setHistoryIndex(i => i - 1)
    setStateInternal(prevState)
    setTimeout(() => { isUndoRedoRef.current = false }, 0)
  }, [historyIndex, history, state])

  // Redo function
  const redo = useCallback(() => {
    if (historyIndex >= history.length - 2) return
    isUndoRedoRef.current = true
    const nextState = history[historyIndex + 2]
    if (nextState) {
      setHistoryIndex(i => i + 1)
      setStateInternal(nextState)
    }
    setTimeout(() => { isUndoRedoRef.current = false }, 0)
  }, [historyIndex, history])

  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([])
    setHistoryIndex(-1)
  }, [])

  const canUndo = historyIndex >= 0
  const canRedo = historyIndex < history.length - 2

  return {
    state,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
  }
}
