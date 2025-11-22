import { useEffect, lazy, Suspense } from "react";
import { 
  StatsSkeletonFallback, 
  ChartSkeletonFallback, 
  ListSkeletonFallback 
} from "../../../components/Skeletons";
import styles from "./styles.module.scss";
import { getDashboardDataThunk } from "../../../store/thunks/dashboard.thunk";
import { useAppDispatch } from "../../../store/hooks";

const Stats = lazy(() => import("./components/Stats"));
const YearlyProfitChart = lazy(() => import("./components/YearlyProfitChart"));
const YearlyCasesChart = lazy(() => import("./components/YearlyCasesChart"));
const UnpaidCases = lazy(() => import("./components/UnpaidCases"));
const CompletedCases = lazy(() => import("./components/CompletedCases"));

const Dashboard = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const thunk = dispatch(getDashboardDataThunk());

    return () => {
      thunk.abort();
    };
  }, [dispatch])

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Suspense fallback={<StatsSkeletonFallback />}>
          <Stats />
        </Suspense>
        
        <Suspense fallback={<ChartSkeletonFallback gridArea="yearly_profit" titleWidth={180} titleHeight={30} />}>
          <YearlyProfitChart />
        </Suspense>
        
        <Suspense fallback={<ChartSkeletonFallback gridArea="yearly_cases" titleWidth={160} titleHeight={30} />}>
          <YearlyCasesChart />
        </Suspense>
        
        <Suspense fallback={<ListSkeletonFallback gridArea="unpaid_cases" titleWidth={150} titleHeight={30} itemCount={3} itemHeight={50} />}>
          <UnpaidCases />
        </Suspense>
        
        <Suspense fallback={<ListSkeletonFallback gridArea="completed_cases" titleWidth={180} titleHeight={30} itemCount={3} itemHeight={50} />}>
          <CompletedCases />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;