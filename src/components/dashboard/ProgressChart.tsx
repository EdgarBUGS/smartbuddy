'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartTooltipContent } from '@/components/ui/chart';
import type { QuizResult } from '@/types';

interface ProgressChartProps {
  history: QuizResult[];
}

export function ProgressChart({ history }: ProgressChartProps) {
  const chartData = history.map((result) => ({
    date: new Date(result.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    score: Math.round((result.score / result.totalQuestions) * 100),
    title: result.quizTitle,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz Performance</CardTitle>
        <CardDescription>Your scores on the last few quizzes.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
                cursor={{ fill: 'hsl(var(--accent) / 0.2)' }}
                content={<ChartTooltipContent 
                    formatter={(value, name, props) => (
                        <div className="flex flex-col">
                            <span className="font-bold">{props.payload.title}</span>
                            <span>Score: {value}%</span>
                        </div>
                    )}
                    labelClassName="hidden"
                />}
            />
            <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
