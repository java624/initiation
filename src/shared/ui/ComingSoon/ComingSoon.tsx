import { useTheme } from '@/theme';
import { makeStyles } from '@/theme/makeStyles';
import { LucideIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Screen } from '../Screen';
import { Text } from '../Text';

interface ComingSoonProps {
    title: string;
    icon: LucideIcon;
}

export const ComingSoon = ({ title, icon: Icon }: ComingSoonProps) => {
    const styles = useStyles();
    const { colors } = useTheme();
    const { t } = useTranslation();

    return (
        <Screen>
            <View style={styles.root}>
                <View style={styles.iconCircle}>
                    <Icon size={32} color={colors.accent} />
                </View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{t('tabs.comingSoon')}</Text>
            </View>
        </Screen>
    );
};

const useStyles = makeStyles(({ colors, spacing, radius, typography }) => ({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
        gap: spacing.sm,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: radius.full,
        backgroundColor: colors.accentSubtle,
        borderWidth: 1,
        borderColor: colors.accentBorder,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    title: {
        ...typography.h2,
        color: colors.textPrimary,
        textAlign: 'center',
    },
    description: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
}));