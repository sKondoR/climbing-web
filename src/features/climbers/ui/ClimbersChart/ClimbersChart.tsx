import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useClimbersStore } from '../../climbers.store'
import { useUserStore } from '../../../user/user.store'
import { IClimbers } from '../../climbers.interfaces'
import { IAllClimber } from '../../../user/user.interfaces'

const GRADES_COLORS: Record<string, string> = {
  '7a': '#F98080',
  '7b': '#F05252',
  '7c': '#E02424',
  '8a': '#9CA3AF',
  '8b': '#6B7280',
  '8c': '#4B5563',
}
const GRADES = Object.keys(GRADES_COLORS);
let maxRoutes = 0;
const prepareData = (ids: number[], climbers: IClimbers) => {
  return ids?.filter((id: number) => !!climbers[id])
  .map((id: number) => {
    const cl = climbers[id];
    let result: Record<string, number> = GRADES.reduce((acc: Record<string, number>, g: string) => {
      acc[g] = 0;
      return acc;
    }, {});
    cl?.leads.forEach((r) => {
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
    } = useClimbersStore()
    const {
      user,
    } = useUserStore()

    if (!user?.team) return
    const ids: (number | null)[] = user ? [...user.team, ...user.friends].map(({ allClimbId }: IAllClimber) => allClimbId) : [];

    const data = prepareData(ids as number[], climbers);
    return (
      <ResponsiveContainer
        width="100%"
        height={ids.length * 60}
        minWidth={400}
        minHeight={600}
      >
        <BarChart
          layout="vertical"
          width={500}
          height={300}
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
          {GRADES.map((g) => <XAxis key={`xaxis-${g}`} xAxisId={g} type="number" domain={[0, maxRoutes]} hide />)}
          {GRADES.map((g) => <Bar key={`bar-${g}`} xAxisId={g} barSize={30} dataKey={g} fill={GRADES_COLORS[g]} />)}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  export default ClimbersChart;