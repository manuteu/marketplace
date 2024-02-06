import React from 'react'
import { Box } from 'native-base';

export default function GridView({ data, renderItem }: any) {
  return (
    <Box w='100%' flexDirection='row' flexWrap='wrap'>
      {data.map((item: any, index: number) => {
        const itemStyle = index % 2 === 0 ? { paddingRight: 5 } : { paddingLeft: 5 };
        return (
          <Box key={index} w='1/2' style={[{ paddingVertical: 10 }, itemStyle]}>{renderItem(item)}</Box>
        );
      })}
    </Box>
  )
}