import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { useClimbersStore } from '../../climbers.store';
import { useUserStore } from '../../../user/user.store';
import { IChartSettings } from '../../../../7-shared/types/chart.types';
import { RoutesFilter } from '../../../../7-shared/ui/RoutesFilter';
import { getClimbersIds } from '../../climbers.utils';
import { GRADES_COLORS } from '../../../../7-shared/constants/routes.constants';
import { useLayoutStore } from '../../../layout/layout.store';
import { filterGrades, prepareChartData } from './chart.utils';

const ClimbersChart = () => {
    const {
      climbers,
    } = useClimbersStore();
    const {
      plotsVisibility,
    } = useLayoutStore();
    const {
      user,
    } = useUserStore();
    
    const [settings, setSettings] = useState({
      isLead: true,
      isTopRope: false,
      is5: false,
      is6: false,
      is7: true,
      is8: true,
      is9: false,
      sortByCategory: false,
    })

    if (!user) return
    const ids = getClimbersIds(user)
    const visibleIds = ids?.filter((id) => !!plotsVisibility[id as number])

    const grades = filterGrades(settings)
    const { data, maxRoutes } = prepareChartData(visibleIds as number[], climbers, grades, settings.isLead, settings.isTopRope);

    const onSettingsChange = (newSettings: IChartSettings) => setSettings(newSettings)

    const CHART_FOOTER_HEIGHT = 80;
    const BAR_HEIGHT = grades.length * 10;
    const CHART_HEIGHT = data.length * BAR_HEIGHT;
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

