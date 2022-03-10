import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../contexts';
import { Entry } from '../../interfaces';

type CardProps = {
  entry: Entry;
};

export const EntryCard: FC<CardProps> = ({ entry }) => {
  const { isDragging, setIsDragging } = useContext(UIContext);

  const dragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('entryId', entry._id);
    setIsDragging(true);
  };

  const dragEnd = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  return (
    <Card
      sx={{
        marginBottom: 1,
      }}
      draggable
      onDragStart={dragStart}
      onDragEnd={dragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>lormem</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
