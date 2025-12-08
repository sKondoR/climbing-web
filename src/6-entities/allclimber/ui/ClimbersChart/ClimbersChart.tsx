import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { IClimbers, IChartSettings } from '../../climbers.interfaces'
import RoutesFilter from '../RoutesFilter/RoutesFilter'
import { getClimbersIds } from '../../climbers.utils';
import { GRADES_COLORS } from '../../../../7-shared/constants/routes.constants';

const GRADES = Object.keys(GRADES_COLORS);
let maxRoutes = 0;

const filterGrades = (settings: IChartSettings): string[] =>
  GRADES.filter((g) =>
    g.startsWith('6') && settings.is6 ||
    g.startsWith('7') && settings.is7 ||
    g.startsWith('8') && settings.is8)

const prepareData = (ids: number[], climbers: IClimbers, grades: string[], isLead: boolean, isTopRope: boolean) => {
  maxRoutes = 0;
  return ids?.filter((id: number) => !!climbers[id])
    .map((id: number) => {
      const cl = climbers[id];
      let result: Record<string, number> = grades.reduce((acc: Record<string, number>, g: string) => {
        acc[g] = 0;
        return acc;
      }, {});
      cl?.[isLead ? 'leads' : 'boulders']
        .filter((r) => !isLead || (isTopRope || !r.isTopRope))
        .forEach((r) => {
          const key = r.grade.slice(0, 2);
          if (result[key] === maxRoutes) maxRoutes++;
          result = {
            ...result,
            [key]: result[key] + 1
          };
        })
      return {
        name: cl.name,
        ...result,
      };
    })
}

const ClimbersChart = () => {
    const {
      climbers,
      plotsVisibility,
    } = useClimbersStore()
    const {
      vkUser,
      user,
    } = useUserStore()
    const currentUser = vkUser || user;
    const [settings, setSettings] = useState({
      isLead: true,
      isTopRope: false,
      is6: false,
      is7: true,
      is8: true,
      sortByCategory: false,
    })

    if (!user) return
    const ids = getClimbersIds(currentUser)
    const visibleIds = ids?.filter((id) => !!plotsVisibility[id as number])

    const grades = filterGrades(settings)
    const data = prepareData(visibleIds as number[], climbers, grades, settings.isLead, settings.isTopRope);

    const onSettingsChange = (newSettings: IChartSettings) => setSettings(newSettings)

    const CHART_FOOTER_HEIGHT = 80;
    const BAR_HEIGHT = grades.length * 10;
    const CHART_HEIGHT = visibleIds.length * BAR_HEIGHT;
    return (
      <>
        <RoutesFilter settings={settings} onSettingsChange={onSettingsChange} />
        <ResponsiveContainer
          width="100%"
          height={CHART_HEIGHT + CHART_FOOTER_HEIGHT}
          minWidth={400}
          minHeight={600}
        >
          <BarChart
            layout="vertical"
            width={500}
            height={CHART_HEIGHT}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 70,
              bottom: 5,
            }}
          >
            <YAxis dataKey="name" type="category"/>
            <Tooltip />
            <Legend />
            {grades.map((g) => <XAxis key={`xaxis-${g}`} xAxisId={g} type="number" domain={[0, maxRoutes]} hide />)}
            {grades.map((g) => <Bar key={`bar-${g}`} xAxisId={g} barSize={BAR_HEIGHT} dataKey={g} fill={GRADES_COLORS[g]} />)}
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }

  export default ClimbersChart;