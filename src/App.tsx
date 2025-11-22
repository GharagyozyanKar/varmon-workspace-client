import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./routes/routes"
import styles from "./App.module.scss"
import { Provider } from "react-redux"
import { store } from "./store/store"

const router = createBrowserRouter(routes)

const App = () => {
  return <div className={styles.wrapper}>
    <Provider store={store}>
      <RouterProvider router={router}>
        
      </RouterProvider>
    </Provider>
  </div>
}

export default App