import { FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { DeleteOutline, SaveOutlined } from '@mui/icons-material';
import {
  capitalize,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
} from '@mui/material';
import { MainLayout } from '../../components/layouts/MainLayout';
import { Entry, EntryStatus } from '../../interfaces';
import { getEntryById } from '../../App/Controllers/EntryController';
import { EntryContext } from '../../contexts';
import { useSnackbar } from 'notistack';
import { getFormatDistanceToNow } from '../../helpers/dateFunctions';

const entryStatus: EntryStatus[] = ['pending', 'inProgress', 'finished'];

type EntryPageProps = {
  entry: Entry;
};

const EntryPage: FC<EntryPageProps> = ({ entry }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { updateEntry, deleteEntry } = useContext(EntryContext);
  const [description, setDescription] = useState<string>(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState<boolean>(false);

  const onUpdateEntry = async () => {
    if (description.length < 3) {
      return;
    }
    const res = await updateEntry({ ...entry, description, status });
    if (res) {
      router.push('/');
    } else {
      enqueueSnackbar('Sorry, error in updated', {
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  const onDeleteEntry = async () => {
    const res = await deleteEntry(entry);
    if (res) {
      router.push('/');
    } else {
      enqueueSnackbar('Sorry, error in delete entry', {
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  const isNotValid = useMemo(() => description.length < 3 && touched, [description, touched]);

  return (
    <MainLayout title='Editando entry...'>
      <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader title='Entry editting' subheader={getFormatDistanceToNow(entry.createdAt)} />
            <CardContent>
              <TextField
                sx={{ marginBottom: 1 }}
                fullWidth
                placeholder='new netry'
                autoFocus
                multiline
                label='new entry'
                helperText={isNotValid && 'entry is required'}
                onBlur={() => setTouched(true)}
                value={description}
                error={isNotValid}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup row value={status} onChange={(e) => setStatus(e.target.value as EntryStatus)}>
                  {entryStatus.map((status) => (
                    <FormControlLabel key={status} value={status} control={<Radio />} label={capitalize(status)} />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions sx={{ paddingLeft: 2, paddingRight: 2 }}>
              <Button startIcon={<SaveOutlined />} variant='contained' fullWidth onClick={onUpdateEntry} disabled={description.length < 3}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        onClick={onDeleteEntry}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: `error.dark`,
          zIndex: 10,
        }}
      >
        <DeleteOutline />
      </IconButton>
    </MainLayout>
  );
};

export default EntryPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };
  const entry = await getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        status: 422,
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};
