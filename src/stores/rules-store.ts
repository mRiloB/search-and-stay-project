import { defineStore } from 'pinia'
import { HouseRule, HouseRuleList } from 'src/types/house-rule'
import { useHouseRules } from 'src/services/house-roules'
import { AxiosError } from 'axios'
import { notify } from 'src/helpers/notify'

export const useRulesStore = defineStore('rules', {
  persist: true,
  state: () => ({
    rules: {} as HouseRuleList,
    loading: false,
    pagination: 1
  }),
  getters: {
    list: (state) => state.rules.data ? state.rules.data.entities : [],
    isLoading: (state) => state.loading,
    currentPage: (state) => state.pagination,
    hasPreviousPage: (state) => state.rules.data.pagination.links.prev == null,
    hasNextPage: (state) => state.rules.data.pagination.links.next == null
  },
  actions: {
    async previousPage () {
      this.pagination--
      await this.loadRules()
    },
    async nextPage () {
      this.pagination++
      await this.loadRules()
    },
    async loadRules () {
      const houseRules = useHouseRules()
      this.loading = true
      try {
        const res = await houseRules._read(this.pagination)
        this.rules = res
      } catch (err) {
        if (err instanceof AxiosError) {
          notify('negative', err.message)
        }
        notify('negative', String(err) || 'Something went wrong. Try again.')
      } finally {
        this.loading = false
      }
    },
    async createRule (payload: HouseRule) {
      const houseRules = useHouseRules()
      this.loading = true
      try {
        const res = await houseRules._create(payload)
        notify('positive', res.message)
        await this.loadRules()
      } catch (err) {
        if (err instanceof AxiosError) {
          notify('negative', err.message)
        }
        notify('negative', String(err) || 'Something went wrong. Try again.')
      } finally {
        this.loading = false
      }
    },
    async editRule (payload: HouseRule) {
      const houseRules = useHouseRules()
      this.loading = true
      try {
        const res = await houseRules._update(payload)
        notify('positive', res.message)
        await this.loadRules()
      } catch (err) {
        if (err instanceof AxiosError) {
          notify('negative', err.message)
        }
        notify('negative', String(err) || 'Something went wrong. Try again.')
      } finally {
        this.loading = false
      }
    },
    async deleteRule (id: number) {
      const houseRules = useHouseRules()
      this.loading = true
      try {
        const res = await houseRules._delete(id)
        notify('positive', res.message)
        await this.loadRules()
      } catch (err) {
        if (err instanceof AxiosError) {
          notify('negative', err.message)
        }
        notify('negative', String(err) || 'Something went wrong. Try again.')
      } finally {
        this.loading = false
      }
    },
  },
});
