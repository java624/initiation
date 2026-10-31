import { ComingSoon } from '@/shared/ui/ComingSoon';
import { ClipboardList } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function HomeworkTab() {
    const { t } = useTranslation();
    return <ComingSoon title={t('tabs.homework')} icon={ClipboardList} />;
}