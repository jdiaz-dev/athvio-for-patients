import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { Meal } from 'src/shared/types/types';

function PlanMealsModal({
  selectedDayMeals,
  setSelectedDayMeals,
}: {
  selectedDayMeals: Meal[] | null;
  setSelectedDayMeals: (meals: Meal[] | null) => void;
}) {
  return (
    <Modal visible={!!selectedDayMeals} transparent animationType="fade" onRequestClose={() => setSelectedDayMeals(null)}>
      {/* Dark overlay — tap outside card to close */}
      <Pressable style={styles.modalOverlay} onPress={() => setSelectedDayMeals(null)}>
        {/* Card — stop event from bubbling to overlay */}
        <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
          {/* ✕ close button */}
          <TouchableOpacity style={styles.modalXButton} onPress={() => setSelectedDayMeals(null)}>
            <Text style={styles.modalXText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.modalHeading}>Meals for this day</Text>

          <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
            {selectedDayMeals?.map((meal, index) => (
              <View key={meal.uuid} style={[styles.mealCard, index > 0 && styles.mealCardSeparator]}>
                {/* Image */}
                {meal.image ? (
                  <Image source={{ uri: meal.image }} style={styles.mealImage} resizeMode="cover" />
                ) : (
                  <View style={styles.mealImagePlaceholder}>
                    <Text style={styles.mealImagePlaceholderText}>🍽️</Text>
                  </View>
                )}

                {/* Name */}
                <Text style={styles.mealName}>{meal.name}</Text>

                {/* Tag badge */}
                <View style={styles.mealTagBadge}>
                  <Text style={styles.mealTagText}>{meal.mealTag}</Text>
                </View>

                {/* Ingredients */}
                {meal.ingredientDetails && meal.ingredientDetails.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                    {meal.ingredientDetails.map((ingredientDetail, i) => (
                      <View key={i} style={styles.ingredientRow}>
                        <View style={styles.ingredientDot} />
                        <Text style={styles.ingredientText}>{ingredientDetail.ingredient?.name}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Recipe */}
                {meal.cookingInstructions ? (
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recipe</Text>
                    <Text style={styles.recipeText}>{meal.cookingInstructions}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default PlanMealsModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#111111',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 32,
    maxHeight: '85%',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#2a2a2a',
  },
  modalXButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 4,
  },
  modalXText: {
    color: '#888888',
    fontSize: 18,
    fontWeight: '600',
  },
  modalHeading: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  modalScroll: {
    flexGrow: 0,
  },
  mealCard: {
    paddingVertical: 16,
  },
  mealCardSeparator: {
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
  },
  mealImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#1a1a1a',
  },
  mealImagePlaceholder: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mealImagePlaceholderText: {
    fontSize: 40,
  },
  mealName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  mealTagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#0066ff22',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#0066ff55',
  },
  mealTagText: {
    color: '#0066ff',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  ingredientDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#0066ff',
  },
  ingredientText: {
    color: '#cccccc',
    fontSize: 14,
  },
  recipeText: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 22,
  },
});
