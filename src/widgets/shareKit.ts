import { Share } from 'react-native';

export const broadcast = (title: string, blurb: string) => {
  Share.share({
    message: `${title}\n\n${blurb}\n\n— Kickboxing ImpRoove Plan`,
  }).catch(() => {});
};
