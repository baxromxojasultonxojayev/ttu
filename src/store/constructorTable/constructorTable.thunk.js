import { createAsyncThunk } from "@reduxjs/toolkit"
import constructorTableService from "../../services/constructorTableService"
import { constructorTableActions } from "./constructorTable.slice"

export const fetchConstructorTableListAction = createAsyncThunk(
  "object/fetchConstructorTableList",
  async (_, { dispatch }) => {
    dispatch(constructorTableActions.setLoader(true))
    try {
      const res = await constructorTableService.getList()
      dispatch(constructorTableActions.setList(res.tables))
    } catch (error) {
      console.log(error)
      throw new Error(error)
    } finally {
      dispatch(constructorTableActions.setLoader(false))
    }
  }
)

export const createConstructorTableAction = createAsyncThunk(
  "object/createConstructorTable",
  async (data, { dispatch }) => {
    try {
      const res = await constructorTableService.create(data)

      dispatch(
        constructorTableActions.add({
          ...data,
          ...res,
        })
      )
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
)

export const updateConstructorTableAction = createAsyncThunk(
  "object/updateConstructorTable",
  async (data, { dispatch }) => {
    try {
      await constructorTableService.update(data)

      dispatch(
        constructorTableActions.setDataById(data)
      )
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }
)

export const deleteConstructorTableAction = createAsyncThunk(
  "object/deleteConstructorTable",
  async (id, { dispatch }) => {
    dispatch(constructorTableActions.setLoader(true))
    try {
      await constructorTableService.delete(id)

      dispatch(
        constructorTableActions.delete(id)
      )
    } catch (error) {
      console.log(error)
      throw new Error(error)
    } finally {
      dispatch(constructorTableActions.setLoader(false))
    }
  }
)
