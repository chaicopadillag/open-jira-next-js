import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { DragEvent, FC, useContext } from 'react';
import { UIContext } from '../../contexts';
import { getFormatDistanceToNow } from '../../helpers/dateFunctions';
import { Entry } from '../../interfaces';

type CardProps = {
  entry: Entry;
};

export const EntryCard: FC<CardProps> = ({ entry }) => {
  const router = useRouter();
  const { setIsDragging } = useContext(UIContext);

  const dragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('entryId', entry._id);
    setIsDragging(true);
  };

  const dragEnd = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  const handlerOnClick = () => {
    router.push(`/entry/${entry._id}`);
  };

  return (
    <Card
      onClick={handlerOnClick}
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
          <Typography variant='body2'>{getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
