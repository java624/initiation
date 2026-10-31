import { ComingSoon } from '@/shared/ui/ComingSoon';
import { BookOpen } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function VocabularyTab() {
    const { t } = useTranslation();
    return <ComingSoon title={t('tabs.vocabulary')} icon={BookOpen} />;
}