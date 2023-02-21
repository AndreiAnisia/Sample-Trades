import React, { useEffect, useState } from 'react'

interface Points {
  x: number,
  y: number
}

const useContextMenu = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [points, setPoints] = useState<Points>({ x: 0, y: 0 })

  useEffect(() => {
    const handleClick = () => setClicked(false);
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [])

  return { clicked, setClicked, points, setPoints };
}

export default useContextMenu
