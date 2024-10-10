export default {
  "root": {
    "base": "relative"
  },
  "popup": {
    "root": {
      "base": "absolute top-10 z-50 block pt-2",
      "inline": "relative top-0 z-auto",
      "inner": "inline-block rounded bg-white shadow-lg dark:bg-gray-700"
    },
    "header": {
      "base": "",
      "title": "px-2 py-3 text-center font-semibold text-gray-900 dark:text-white",
      "selectors": {
        "base": "mb-2 flex justify-between",
        "button": {
          "base": "rounded bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
          "prev": "",
          "next": "",
          "view": ""
        }
      }
    },
    "view": {
      "base": "p-1"
    },
    "footer": {
      "base": "mt-2 flex space-x-2",
      "button": {
        "base": "w-full rounded px-5 py-2 text-center text-sm font-medium border-transparent",
        "today": "bg-cyan-700 text-white hover:bg-cyan-800",
        "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
      }
    }
  },
  "views": {
    "days": {
      "header": {
        "base": "rounded mb-1 grid grid-cols-7 ",
        "title": "h-6 text-center text-sm font-medium leading-6 text-gray-500"
      },
      "items": {
        "base": "grid w-64 grid-cols-7",
        "item": {
          "base": "block flex-1 cursor-pointer rounded border-0 text-center p-1 text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 border-transparent outline-transparent focus:outline-transparent",
          "selected": "bg-cyan-700 text-white hover:bg-cyan-600 outline-transparent focus:outline-transparent focus:border-transparent focus:ring-0",
          "disabled": "text-gray-500"
        }
      }
    },
    "months": {
      "items": {
        "base": "grid w-64 grid-cols-4",
        "item": {
          "base": "block flex-1 cursor-pointer rounded border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100",
          "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
          "disabled": "text-gray-500"
        }
      }
    },
    "years": {
      "items": {
        "base": "grid w-64 grid-cols-4",
        "item": {
          "base": "block flex-1 cursor-pointer rounded border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100",
          "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
          "disabled": "text-gray-500"
        }
      }
    },
    "decades": {
      "items": {
        "base": "grid w-64 grid-cols-4",
        "item": {
          "base": "block flex-1 cursor-pointer rounded border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100",
          "selected": "bg-cyan-700 text-white hover:bg-cyan-600",
          "disabled": "text-gray-500"
        }
      }
    }
  }
}