/// <reference types="mocha" />

import { tmpdir } from 'os'
import { basename, join } from 'path'
import * as assert from 'power-assert'
import rewire = require('rewire')

import * as idcr from '../src/lib/index'
import { IDData } from '../src/lib/model'


const filename = basename(__filename)
const tmpDir = join(tmpdir(), 'test-tmp')
const pathPrefix = 'mytest'
const mods = rewire('../src/lib/common')


describe(filename, () => {

  it('Should read() works', async () => {
    const opts: Options = {
      dllTxt: 'c:/sdtapi.dll',
      dllImage: 'c:/wltrs.dll',
    }

    try {
      const devices = await idcr.init(opts)

      if ( ! devices.length) {
        assert(false, 'No device found')
        return
      }
      const ret: IDData = await idcr.read(devices[0])

      assert(!! ret, 'result invalid')
      assert(ret.base && ret.base.name, 'name of IDData empty')
    }
    catch (ex) {
      assert(false, ex)
    }
  })
})