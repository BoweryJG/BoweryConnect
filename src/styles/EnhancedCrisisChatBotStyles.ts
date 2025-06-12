import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  
  backButton: {
    padding: 10,
  },
  
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  
  offlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: 'rgba(252, 211, 77, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  
  offlineText: {
    fontSize: 12,
    color: '#FCD34D',
    marginLeft: 4,
  },
  
  headerActions: {
    flexDirection: 'row',
  },
  
  iconButton: {
    padding: 10,
    marginLeft: 5,
  },
  
  emergencyBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(239, 68, 68, 0.2)',
  },
  
  emergencyButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 20,
  },
  
  emergencyText: {
    color: '#FCA5A5',
    fontWeight: '600',
    fontSize: 14,
  },
  
  messagesContainer: {
    flex: 1,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    padding: 20,
    paddingBottom: 20,
  },
  
  welcomeContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 20,
  },
  
  welcomeText: {
    color: '#E2E8F0',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
  },
  
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(59, 130, 246, 0.8)',
  },
  
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  
  userMessageText: {
    color: '#fff',
  },
  
  botMessageText: {
    color: '#E2E8F0',
  },
  
  emotionIndicator: {
    position: 'absolute',
    top: -8,
    right: -8,
    fontSize: 20,
  },
  
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'flex-end',
  },
  
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 16,
    maxHeight: 100,
  },
  
  voiceButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  
  voiceButtonActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
  },
  
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  
  sendButtonDisabled: {
    opacity: 0.5,
  },
  
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  settingsPanel: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: '#1F2937',
    borderRadius: 24,
    padding: 24,
    maxHeight: SCREEN_HEIGHT * 0.8,
  },
  
  settingsTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  settingLabel: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginRight: 10,
  },
  
  selectedLanguage: {
    backgroundColor: '#3B82F6',
  },
  
  languageText: {
    color: '#fff',
    fontSize: 16,
  },
  
  soundGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  
  soundButton: {
    width: (SCREEN_WIDTH * 0.9 - 48 - 30) / 4,
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  
  selectedSound: {
    backgroundColor: '#10B981',
  },
  
  soundIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  
  soundName: {
    color: '#fff',
    fontSize: 12,
  },
  
  closeButton: {
    marginTop: 24,
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Peer support styles
  peerPanel: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: '#1F2937',
    borderRadius: 24,
    padding: 24,
    maxHeight: SCREEN_HEIGHT * 0.7,
  },
  
  peerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  
  peerSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  peerCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  peerUnavailable: {
    opacity: 0.5,
  },
  
  peerInfo: {
    flex: 1,
    marginRight: 12,
  },
  
  peerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  
  peerStory: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
  
  peerStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  
  peerStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});