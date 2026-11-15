import { ComingSoon } from '@/shared/ui/ComingSoon';
import { User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function ProfileTab() {
    const { t } = useTranslation();
    return <ComingSoon title={t('tabs.profile')} icon={User} />;
}