"use client"

import { useEffect } from "react"

const Project = () => {

  useEffect(() => {
    const items = document.querySelectorAll(".project")

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
        } else {
          entry.target.classList.remove("active")
        }
      })
    }, { threshold: 0.3 })

    items.forEach((item) => observer.observe(item))
  }, [])

  return (
    <div className="mt-25">

      <h1 className="text-5xl font-bold m-6">My Projects</h1>

      <div className="projects grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <p>no Projects Yet</p>
      </div>

    </div>
  )
}

export default Project