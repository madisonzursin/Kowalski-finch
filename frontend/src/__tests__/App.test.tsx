import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, describe, vitest, test} from 'vitest'
import App from '../App'


//function to simulate window resizing in tests
const resizeWindow = (width: number, height: number) => {
  // initial window size of vitest with jsdom environment 
  window.innerWidth = width
  window.innerHeight = height
  window.dispatchEvent(new Event('resize'))
}

describe('Simulating button clicks', () => {
  test('simulates twinkle button click with userEvent', async () => {
    render(<App />)
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: 'Play Twinkle Twinkle →' })
    await user.click(button)
    expect(button.className).toContain('playTwinkle-btn') // Check if the button has the correct class name after click
  })
  test('simulates mary button click with userEvent', async () => {
    render(<App />)
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: 'Play Mary Little Lamb →' })
    await user.click(button)
    expect(button.className).toContain('playMary-btn') // Check if the button has the correct class name after click
  })
  test('simulates row row your boat button click with userEvent', async () => {
    render(<App />)
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: 'Play Row Your Boat →' })
    await user.click(button)
    expect(button.className).toContain('playRow-btn') // Check if the button has the correct class name after click
  })
})

describe('Simulating window resizing', () => {
  test('simulates window resizing to mobile view', () => {
    render(<App />)
    resizeWindow(375, 667) // Simulate iPhone 8 dimensions
    expect(window.innerWidth).toBe(375)
    expect(window.innerHeight).toBe(667)
  })

  test('simulates window resizing to desktop view', () => {
    render(<App />)
    resizeWindow(1440, 900) // Simulate typical desktop dimensions
    expect(window.innerWidth).toBe(1440)
    expect(window.innerHeight).toBe(900)
  })
})